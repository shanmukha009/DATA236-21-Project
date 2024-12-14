from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import svds

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Root route
@app.route('/')
def index():
    return "Flask API is running!"  # Basic test message

# Load your dataset and preprocess
df = pd.read_csv('ecommerce_sample_1700_rows.csv')
df.columns = ['user_id', 'prod_id', 'rating', 'price']
df = df.drop(columns=['price'])  # Drop price as it's not needed for the recommendations
df['user_id'] = df['user_id'].astype(str)
df['prod_id'] = df['prod_id'].astype(str)

# Handle duplicates: aggregate ratings for each user-product pair
df = df.groupby(['user_id', 'prod_id'], as_index=False).agg({'rating': 'mean'})

# Preprocess data: Filter users with sufficient ratings
counts = df['user_id'].value_counts()
df_final = df[df['user_id'].isin(counts[counts >= 1].index)]

# Create ratings matrix (users as rows, products as columns)
final_ratings_matrix = df_final.pivot(index='user_id', columns='prod_id', values='rating').fillna(0)

# Convert ratings matrix to a sparse format for efficiency
final_ratings_matrix_sparse = csr_matrix(final_ratings_matrix.values)

# Perform Singular Value Decomposition (SVD) for matrix factorization
k_value = min(final_ratings_matrix_sparse.shape) - 1
U, sigma, Vt = svds(final_ratings_matrix_sparse, k=k_value)
sigma = np.diag(sigma)

# Reconstruct predicted ratings
predicted_ratings = np.dot(np.dot(U, sigma), Vt)
predicted_ratings_df = pd.DataFrame(predicted_ratings, index=final_ratings_matrix.index, columns=final_ratings_matrix.columns)

# Recommendation function: Returns top N recommended products for a user
def recommend_items(user_id, top_n=5):
    if user_id not in predicted_ratings_df.index:
        # If the user is not in the predicted ratings matrix, return top N popular items based on average rating
        popular_items = df.groupby('prod_id').agg({'rating': 'mean'}).sort_values(by='rating', ascending=False).head(top_n)
        return popular_items.index.tolist()
    
    user_index = list(final_ratings_matrix.index).index(user_id)
    user_predicted_ratings = predicted_ratings_df.iloc[user_index].sort_values(ascending=False)
    
    # Return top N recommended products
    recommended_products = user_predicted_ratings.head(top_n).index.tolist()
    return recommended_products

# API Endpoint for Recommendations
@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')  # Get user_id from request
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    try:
        recommendations = recommend_items(user_id)  # Fetch recommendations based on user_id
        
        # Fetch product details (name, price, etc.) from the main dataframe
        

        recommended_products = df[df['prod_id'].isin(recommendations)].drop_duplicates(subset='prod_id')
        product_details = recommended_products[['prod_id', 'rating']].to_dict(orient='records')

        
        
        # Return recommendations with product details
        return jsonify({'user_id': user_id, 'recommendations': product_details})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

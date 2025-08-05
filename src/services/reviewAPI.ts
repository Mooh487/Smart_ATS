import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ReviewData {
  jobTitle: string;
  jobDescription: string;
  resumeFileName: string;
  matchScore: number;
  missingKeywords: string[];
  profileSummary: string;
  recommendations?: string[];
}

interface Review {
  id: string;
  userId: string;
  jobTitle: string;
  jobDescription: string;
  resumeFileName: string;
  matchScore: number;
  missingKeywords: string[];
  profileSummary: string;
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

interface ReviewStats {
  totalReviews: number;
  averageScore: number;
  bestScore: number;
  recentReviews: Review[];
  monthlyStats: Array<{
    month: string;
    count: number;
    averageScore: number;
  }>;
}

export const reviewAPI = {
  // Save a new review
  async saveReview(reviewData: ReviewData): Promise<Review> {
    const response = await api.post('/reviews', reviewData);
    return response.data.review;
  },

  // Get all reviews for the current user
  async getUserReviews(page = 1, limit = 10): Promise<{
    reviews: Review[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/reviews', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get a specific review by ID
  async getReview(reviewId: string): Promise<Review> {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data.review;
  },

  // Update a review
  async updateReview(reviewId: string, updateData: Partial<ReviewData>): Promise<Review> {
    const response = await api.put(`/reviews/${reviewId}`, updateData);
    return response.data.review;
  },

  // Delete a review
  async deleteReview(reviewId: string): Promise<void> {
    await api.delete(`/reviews/${reviewId}`);
  },

  // Get user review statistics
  async getReviewStats(): Promise<ReviewStats> {
    const response = await api.get('/reviews/stats');
    return response.data;
  },

  // Search reviews by job title or keywords
  async searchReviews(query: string, page = 1, limit = 10): Promise<{
    reviews: Review[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/reviews/search', {
      params: { q: query, page, limit }
    });
    return response.data;
  },

  // Export user data
  async exportUserData(): Promise<{
    user: any;
    reviews: Review[];
    stats: ReviewStats;
  }> {
    const response = await api.get('/reviews/export');
    return response.data;
  },

  // Get reviews by date range
  async getReviewsByDateRange(startDate: string, endDate: string): Promise<Review[]> {
    const response = await api.get('/reviews/date-range', {
      params: { startDate, endDate }
    });
    return response.data.reviews;
  },

  // Get trending keywords from user's reviews
  async getTrendingKeywords(): Promise<Array<{
    keyword: string;
    frequency: number;
    averageScore: number;
  }>> {
    const response = await api.get('/reviews/trending-keywords');
    return response.data.keywords;
  },

  // Compare two reviews
  async compareReviews(reviewId1: string, reviewId2: string): Promise<{
    review1: Review;
    review2: Review;
    comparison: {
      scoreDifference: number;
      commonKeywords: string[];
      uniqueKeywords1: string[];
      uniqueKeywords2: string[];
      recommendations: string[];
    };
  }> {
    const response = await api.get(`/reviews/compare/${reviewId1}/${reviewId2}`);
    return response.data;
  },
};

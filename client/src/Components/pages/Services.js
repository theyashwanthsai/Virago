import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';

function Services() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news articles from backend
    axios.get('http://localhost:3001/news')
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  return (
      <div className="services-container">
      <h2 className="section-title">Finance News Articles</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="articles-container">
          <div className="half-container">
            {articles.slice(0, Math.ceil(articles.length / 2)).map((article, index) => (
              <div className="article" key={index}>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-author">Author: {article.author}</p>
                <p className="article-description">Description: {article.description}</p>
                <a className="article-link" href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                <hr className="article-divider" />
              </div>
            ))}
          </div>
          <div className="half-container">
            {articles.slice(Math.ceil(articles.length / 2)).map((article, index) => (
              <div className="article" key={index}>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-author">Author: {article.author}</p>
                <p className="article-description">Description: {article.description}</p>
                <a className="article-link" href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                <hr className="article-divider" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>  );
}

export default Services;

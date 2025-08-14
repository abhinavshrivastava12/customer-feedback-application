import React, { useState } from 'react';
import './ReviewList.css';

function ReviewList({ feedbackData }) {
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = feedbackData.filter(f =>
    (selectedProduct === 'All' || f.product === selectedProduct) &&
    (f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.comment.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'Product', 'Rating', 'Sentiment', 'Comment', 'Timestamp'],
      ...filteredData.map(f => [f.name, f.email, f.product, f.rating, f.sentiment, f.comment, f.timestamp])
    ];
    const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reviews_export.csv';
    link.click();
  };

  return (
    <div className="review-list">
      <h2>📋 All Reviews</h2>
      <div className="filters">
        <input placeholder="Search by name/comment" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          {['All','Mobiles','Laptops','Headphones','Earbuds','Charger','Powerbanks','Fans','Speakers','Smartwatches'].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {filteredData.length === 0 ? <p>No reviews found.</p> : (
        filteredData.map((f, i) => (
          <div key={i} className="review-card">
            <h3>{f.name} ⭐{f.rating}</h3>
            <p><strong>Email:</strong> {f.email}</p>
            <p><strong>Product:</strong> {f.product}</p>
            <p><strong>Sentiment:</strong> {f.sentiment}</p>
            <p>{f.comment}</p>
            {f.mediaPreview && (
              f.mediaType === 'video' ?
                <video width="100%" controls><source src={f.mediaPreview} /></video> :
                <img src={f.mediaPreview} alt="Uploaded" className="media-preview" />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;

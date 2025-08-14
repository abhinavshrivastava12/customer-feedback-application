import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './AddReview.css';

function AddReview({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: 'Mobiles',
    rating: 5,
    sentiment: 'Loved it',
    comment: '',
    media: null,
    mediaPreview: null,
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        media: file,
        mediaPreview: preview,
        mediaType: file.type.startsWith("video") ? "video" : "image"
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    onSubmit(reviewData);

    fetch('https://sheetdb.io/api/v1/7l7abuetzsjj9', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: reviewData })
    });

    emailjs.send(
      'service_qewhn7r',
      'template_m2vo81j',
      {
        user_name: formData.name,
        user_email: formData.email,
        message: `Hi ${formData.name}, thank you for your feedback on ${formData.product}!`
      },
      'c_aEIAjVIuvsudlY3'
    );

    setFormData({
      name: '',
      email: '',
      product: 'Mobiles',
      rating: 5,
      sentiment: 'Loved it',
      comment: '',
      media: null,
      mediaPreview: null
    });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>📝 Submit Your Review</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

      <select name="product" value={formData.product} onChange={handleChange}>
        {['Mobiles','Laptops','Headphones','Earbuds','Charger','Powerbanks','Fans','Speakers','Smartwatches'].map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select name="rating" value={formData.rating} onChange={handleChange}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star</option>)}
      </select>

      <select name="sentiment" value={formData.sentiment} onChange={handleChange}>
        <option value="Loved it">Loved it 💖</option>
        <option value="It's okay">It's okay 🙂</option>
        <option value="Didn't like it">Didn't like it 😞</option>
      </select>

      <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Your feedback..." required />
      <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />

      {formData.mediaPreview && (
        formData.mediaType === "video" ?
          <video width="100%" controls><source src={formData.mediaPreview} /></video> :
          <img src={formData.mediaPreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
      )}

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default AddReview;

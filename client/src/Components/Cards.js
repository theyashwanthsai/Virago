import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Success Stories</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img9.jpg'
              text="Melinda Gates has been a vocal advocate for women's financial empowerment and access to financial services.Her efforts have helped millions of women gain access to financial resources and opportunities for economic advancement."
              label='Melinda Gates Foundation'
              path='/chat'
            />
            <CardItem
              src='images/img2.jpeg'
              text='Shivani Siroya, founder and CEO of Tala, a fintech company that leverages alternative data to provide financial services to underserved populations, particularly women in emerging markets.'
              label='Tala CEO'
              path='/chat'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img3.jpg'
              text='Cherie Blair foundation, has provided mentorship, training, and access to capital to thousands of women entrepreneurs in developing countries.Her work has empowered women to start and grow businesses, create jobs, and contribute to economic growth in their communities.'
              label='Cherie Blair Foundation for Women'
              path='/chat'
            />
            <CardItem
              src='images/img4.jpg'
              text="Anne-Marie Slaughter is the CEO of New America, a think tank focused on advancing ideas that promote inclusive prosperity and social justice. She has been a leading voice in advocating for policies that support women's economic empowerment."
              label='Anne-Marie Slaughter'
              path='/posts'
            />
            <CardItem
              src='images/img8.jpeg'
              text='Jean Chatzky is a renowned financial journalist and author who has dedicated her career to educating women about personal finance. Through her books, articles, and television appearances, she has empowered millions of women.'
              label='Jean Chatzky'
              path='/posts'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
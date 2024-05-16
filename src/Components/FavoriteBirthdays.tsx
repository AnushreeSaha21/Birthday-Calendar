import React from 'react';
import './BirthdayList.css';

interface Props {
  favoriteBirthdays: { date: Date; text: string; year: number }[];
}

const FavoriteBirthdays: React.FC<Props> = ({ favoriteBirthdays }) => {
  console.log('Favorite birthdays:', favoriteBirthdays);
  return (
    <div className="favorite-birthdays">
      <h2>Favorite Birthdays</h2>
      <div className='birthdaylistcontent'>
      <ul>
      {favoriteBirthdays.length === 0 ? (
                            <p>No Favourite birthdays present .</p>
                        ) : (
        favoriteBirthdays.map((birthday, index) => (
          <li key={index}>
          
          {birthday.text} - {birthday.year} {birthday.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </li>
        ))
      )}
      </ul>
      </div>
      
    </div>
  );
};

export default FavoriteBirthdays;




























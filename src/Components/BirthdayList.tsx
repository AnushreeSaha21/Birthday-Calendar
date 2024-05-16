import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BirthdayList.css';
import FavoriteBirthdays from './FavoriteBirthdays';

interface Props {
    selectedDate: Date | null;
    clickedStars: boolean[];
    setClickedStars: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const BirthdayList: React.FC<Props> = ({ selectedDate, clickedStars, setClickedStars }) => {
    const [birthdays, setBirthdays] = useState<{ text: string; year: number }[]>([]);
    const [favoriteBirthdays, setFavoriteBirthdays] = useState<{ date: Date; text: string; year: number }[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchBirthdays = async () => {
            if (selectedDate) {
                try {
                    const month = selectedDate.getMonth() + 1;
                    const day = selectedDate.getDate();
                    const response = await axios.get(
                        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`
                    );
                    console.log('API Response:', response.data);
                    const data = response.data;
                    if (data.births) {
                        const relevantBirthdays = data.births.map((birthday: any) => ({
                            text: birthday.text,
                            year: birthday.year
                        }));
                        setBirthdays(relevantBirthdays);
                        
                        setClickedStars(Array(relevantBirthdays.length).fill(false));
                    } else {
                        setBirthdays([]);
                    }
                } catch (error) {
                    console.error('Error fetching birthdays:', error);
                    setError('Error fetching birthdays. Please try again later.');
                }
            }
        };

        fetchBirthdays();
    }, [selectedDate, setClickedStars]);

    const handleAddToFavorites = (text: string, year: number) => {
        setFavoriteBirthdays(prevFavorites => [...prevFavorites, { date: selectedDate ?? new Date(), text, year }]);
    }; 
 

    const handleStarClick = (index: number) => {
        const updatedClickedStars = [...clickedStars];
        updatedClickedStars[index] = !updatedClickedStars[index];
        setClickedStars(updatedClickedStars);
    };
    return (
        <div className="birthday-list">
            <h2>Birthdays on {selectedDate?.toLocaleDateString()}</h2>
            <div className='birthdaylistcontent'>
            {error ? (
                    <p>{error}</p>
                ) : (
                <ul>
                    {birthdays.length === 0 ? (
                            <p>No birthdays present on {selectedDate?.toLocaleDateString()}.</p>
                        ) : (
                    birthdays.map((birthday, index) => (
                        <li key={index}>
                            <span style={{ marginRight: '5px' }}>{birthday.text} - {birthday.year}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={clickedStars[index] ? 'yellow' : 'currentColor'} className="bi bi-star-fill" viewBox="0 0 16 16" onClick={() => {
                                handleStarClick(index);
                                handleAddToFavorites(birthday.text, birthday.year); // Add to favorites when the star is clicked
                            }} >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                
                            </svg>
                        </li>
                    ))
                )}
                </ul>
                        )}
            </div>
            <FavoriteBirthdays favoriteBirthdays={favoriteBirthdays} />
        </div>
    );
};

export default BirthdayList;



























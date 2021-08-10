import React, { useState, useEffect } from 'react';
import {FaHeart} from 'react-icons/fa'
import { saveBabysitterIds, getSavedBabysitterIds } from '../../utils/localStorage';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_BABYSITTER } from '../../utils/mutations'
import Auth from '../../utils/auth';
import { QUERY_SINGLE_BABYSITTER } from '../../utils/queries';

const FavouriteButton = () => {
    const [saveBabysitter, { error }] = useMutation(SAVE_BABYSITTER);

    // create state to hold saved bookId values
    const [savedBabysitterIds, setSavedBabysitterIds] = useState(getSavedBabysitterIds());

    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => saveBabysitterIds(savedBabysitterIds);
    });
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { babysitterId } = useParams();

    const { data } = useQuery(QUERY_SINGLE_BABYSITTER, {
        // pass URL parameter
        variables: { babysitterId: babysitterId },
    });
    console.log(babysitterId)
    const babysitter = data?.babysitter || {};

    // create function to handle saving a book to our database
    const handleSaveBabysitter = async () => {
        // find the book in `searchedBooks` state by the matching id
        const babysitterId = data.babysitter._id
        console.log(babysitterId)
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            // const response = await saveBabysitter(bookToSave, token);
            // use SAVE_BOOK mutation
            await saveBabysitter({
                variables: { babysitterId }
            });

            if (error) {
                throw new Error('something went wrong!');
            }
            // if book successfully saves to user's account, save book id to state
            setSavedBabysitterIds([...savedBabysitterIds, babysitterId]);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            {Auth.loggedIn() && (
                <FaHeart 
                    disabled={savedBabysitterIds?.some((savedBabysitterId) => savedBabysitterId === babysitter.babysitterId)}
                    className='icon'
                    onClick={() => handleSaveBabysitter(babysitter.babysitterId)}
                />
            )}
        </>
    );
};

export default FavouriteButton;
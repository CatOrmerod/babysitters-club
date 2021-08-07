import React, { useState } from 'react';
import './SMSForm.css';

function SMSForm ({ babysitterPh }) {
    const [ message, setMessage ] = useState({ to: babysitterPh, body: ''})
    const [ submitting, setSubmitting ] = useState(false)
    const [ error, setError ] = useState(false)
    function onHandleChange(event) {
        const name = event.target.getAttribute('name');
        setMessage({
            ...message, 
            [name]: event.target.value }
        );
    }
    function onSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMessage({
                        to: babysitterPh,
                        body: ''
                    })
                    setSubmitting(false);
                    setError(false);
                } else {
                    setSubmitting(false);
                    setError(true);
                }
            });
    }
        return (
            <form
                onSubmit={onSubmit}
                className={error ? 'error sms-form' : 'sms-form'}
            >
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        name="body"
                        id="body"
                        value={message.body}
                        onChange={onHandleChange} />
                </div>
                <button type="submit">
                    Send message
                </button>
            </form>
        );
}

export default SMSForm;
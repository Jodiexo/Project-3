import react from 'react';
import {BrowserRouter as Router, Route, Swtich} from 'react-router-dom'
import { useEffect, useState, useHistory } from 'react';

const CreateAccount = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const history = useHistory();


 const handleCreateAccount = (e) => {
    e.preventDefault();

  if (Password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
}
}

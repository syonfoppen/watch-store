const express = require('express');
const {StatusCodes} = require('http-status-codes');

const router = express.Router();

router.get('',(req, res ) => {
    res.send('Dit word een lijst met producten');
});

router.post('',(req, res ) => {
    res.
        status(StatusCodes.CREATED).send('Hier gaan we producten toevoegen');
});

module.exports = router;
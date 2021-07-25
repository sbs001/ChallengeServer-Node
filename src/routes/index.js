const { default: axios } = require('axios');
const { Router } = require('express');

require('dotenv').config();
const { API_KEY } = process.env;


const router = Router();

router.get('/:param', async(req, res) => {

    try {

        const a = await axios.get(`https://api.yelp.com/v3/businesses/search?categories=parking&term=parking&limit=50&location=${req.params.param}`, {
            'headers': {
                'Authorization': `Bearer ${API_KEY}`
            }
        })
        return res.send(a.data)

    } catch (error) {
        return res.stattus(400).send(error)
    }


})

module.exports = router
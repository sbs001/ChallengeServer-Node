const { default: axios } = require('axios');
const { Router } = require('express');


const router = Router();

router.get('/:key/:param', async(req, res) => {

    try {

        const a = await axios.get(`https://api.yelp.com/v3/businesses/search?categories=parking&term=parking&limit=50&location=${req.params.param}`, {
            'headers': {
                'Authorization': `Bearer ${req.params.key}`
            }
        })
        return res.send(a.data)

    } catch (error) {
        return res.status(400).send(error)
    }


})

module.exports = router

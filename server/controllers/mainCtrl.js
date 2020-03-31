module.exports = {
    createListing: (req, res) => {
        console.log(req.body)
        const {name, address, city, state, zip, img, mortgage, rent} = req.body;
        const db = req.app.get('db');

        db.houses.create_listing({name, address, city, state, zip: +zip, img, mortgage: +mortgage, rent: +rent})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    }
}
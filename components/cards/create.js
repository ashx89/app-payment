var Account = require(global.__base + '/manager').AccountModel;
var cardsApi = require(global.__orders_base + '/lib/cards');

/**
 * Create a card
 */
var create = function onFetch(req, res, next) {
	Account.findOne({ user: req.user._id }, function onFind(err, account) {
		if (err) return next(err);
		
		cardsApi.create(account.customer_id, req.body.stripeToken, function onCardCreate(err, card) {
			if (err) return next(err);
			return res.status(200).json(card);
		});
	});
};

module.exports = create;

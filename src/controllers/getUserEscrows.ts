import Escrow from "../models/Escrows"

const getUserEscrows = function(id){
	const escrows = Escrow.findAll({
		where: {
			buyerId: id
		}
	});

	return escrows;
}

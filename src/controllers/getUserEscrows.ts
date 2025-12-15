import Escrow from "../models/Escrow"

const getUserEscrows = function(id: string){
	const escrows = Escrow.findAll({
		where: {
			buyerId: id,
		}
	});

	return escrows;
}

export default getUserEscrows;

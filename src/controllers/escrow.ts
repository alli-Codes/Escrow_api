import Escrow from "../models/Escrow";

type EscrowType = {
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  buyerId: number;
  sellerId: number;
  status: string;
  deliveryMethod: string;
  deliveryFee: string;
  estimatedDeliveryTime: number;
};

export const createEscrow = async function (payload: EscrowType) {
  try {
    await Escrow.create(payload);
  } catch (error) {
    throw error;
  }
};

export const editEscrowBySeller = async function (
  id: string,
  payload: EscrowType,
) {
  try {
    Escrow.update(payload, {
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllUserEscrow = async function (id: string) {
  try {
    const escrows = await Escrow.findAll({ where: { id } });
    return escrows;
  } catch (error) {
    throw error;
  }
};

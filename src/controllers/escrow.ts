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

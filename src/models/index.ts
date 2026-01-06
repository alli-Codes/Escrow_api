import User from "./User";
import Token from "./Token";

User.hasMany(Token, {
  foreignKey: "userId",
});
Token.belongsTo(User, {
  foreignKey: "userId",
});

export { User, Token };

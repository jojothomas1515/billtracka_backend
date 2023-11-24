var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, CreatedAt, } from 'sequelize-typescript';
let User = class User extends Model {
};
__decorate([
    Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ field: 'first_name', type: DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    Column({ field: 'last_name', type: DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    Column({ type: DataType.STRING, field: 'hashed_password' }),
    __metadata("design:type", String)
], User.prototype, "hashedPassword", void 0);
__decorate([
    Column({ type: DataType.STRING, field: 'refresh_token' }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    Column({ type: DataType.STRING, field: 'google_id' }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    Column({ type: DataType.STRING, field: 'github_id' }),
    __metadata("design:type", String)
], User.prototype, "githubId", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
User = __decorate([
    Table({ tableName: 'users', createdAt: 'created_at', updatedAt: false })
], User);
export default User;
//# sourceMappingURL=userModel.js.map
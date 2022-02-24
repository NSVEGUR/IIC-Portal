import { getModelForClass, prop } from "@typegoose/typegoose";


export class User {
	[x: string]: any;

	@prop({ required: true })
	googleId: string;

	@prop({ required: true })
	displayName: string;

	@prop({ required: true })
	firstName: string;

	@prop({ required: true })
	lastName: string;

	@prop()
	image: string;

	@prop({ default: Date.now })
	createdAt: Date;

}

export const UserModel = getModelForClass(User);
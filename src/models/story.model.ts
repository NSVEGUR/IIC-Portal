import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

class Story {
	[x: string]: any;


	@prop({ required: true, trim: true })
	title: string;

	@prop({ required: true })
	title2: string;

	@prop({ required: true })
	title3: string;

	@prop({ required: true })
	title4: string;

	@prop({ required: true })
	title5: string;

	@prop({ required: true })
	title6: string;

	@prop({ required: true })
	title7: string;

	@prop({ required: true })
	title8: string;

	@prop({ required: true })
	title9: string;

	@prop({ required: true })
	title10: string;

	@prop({ required: true })
	title11: string;

	@prop({ required: true })
	title12: string;

	@prop({ required: true })
	title13: string;

	@prop({ required: true })
	title14: string;

	@prop({ required: true })
	title15: string;

	@prop({ required: true })
	title16: string;

	@prop({ required: true })
	body: string;

	@prop({ default: 'public', enum: ['public', 'private'], })
	status: string;

	@prop({ default: 'public1', enum: ['public1', 'private1'], })
	status1: string;

	@prop({ default: 'public2', enum: ['public2', 'private2'], })
	status2: string;

	@prop({ default: 'public3', enum: ['public3', 'private3'], })
	status3: string;

	@prop({ default: 'public4', enum: ['public4', 'private4'], })
	status4: string;

	@prop({
		default: 'Technological innovation',
		enum: ['Technological innovation', 'Non-Technological / Social / Community Innovation'],
	}) status5: string;

	@prop({
		default: 'IP/Patented Technology',
		enum: ['IP/Patented Technology', 'Non-Patented Technology'],
	}) status6: string;

	@prop({
		default: 'Faculty',
		enum: ['Faculty', 'Staff', 'Student', 'Faculty and Student', 'Incubatee Entrepreneur', 'Alumini Entrepreneur', 'Innovator/ Entrepreeur External to institute'],
	}) status7: string;

	@prop({
		default: 'Male',
		enum: ['Male', 'Female', 'Transgender'],
	}) status8: string;

	@prop({
		default: 'Faculty',
		enum: ['Faculty', 'Staff', 'Student', 'Faculty and Student', 'Incubatee Entrepreneur', 'Alumini Entrepreneur', 'Innovator/ Entrepreeur External to institute'],
	}) status9: string;

	@prop({
		default: 'TRL 0',
		enum: ['TRL 0', 'TRL 1', 'TRL 2', 'TRL 3', 'TRL 4', 'TRL 5', 'TRL 6', 'TRL 7', 'TRL 8', 'TRL 9'],
	}) status10: string;

	@prop({
		default: 'TRL 0',
		enum: ['TRL 0', 'TRL 1', 'TRL 2', 'TRL 3', 'TRL 4', 'TRL 5', 'TRL 6', 'TRL 7', 'TRL 8', 'TRL 9'],
	}) status11: string;


	@prop({
		default: 'Innovation Development Dropped',
		enum: ['Innovation Development Dropped', 'Innovation Development Ongoing', 'Innovation Development Completed', 'Innovation adopted and Implemented at Ground'],
	}) status12: string;

	@prop({
		default: 'Yes',
		enum: ['Yes', 'No'],
	}) status13: string;

	@prop({
		default: 'Govt. Agency (Central)',
		enum: ['Govt. Agency (Central)', 'Govt. Agency (State)', 'Educational Institution', 'Corporate/industry Association', 'Non Govt. Agency', 'International Agency'],
	}) status14: string;

	@prop({
		default: 'Yes',
		enum: ['Yes', 'No'],
	}) status15: string;

	@prop({
		default: 'Yes',
		enum: ['Yes', 'No'],
	}) status16: string;

	@prop({
		default: 'Yes',
		enum: ['Yes', 'No'],
	}) status17: string;

	@prop({
		default: 'Yes',
		enum: ['Yes', 'No'],
	}) status18: string;

	@prop({
		default: 'Product innovation',
		enum: ['Product innovation', 'Process innovation', 'Service innovation', 'Market place Innovation', 'Reverse Engineering', 'Management Process'],
	}) status19: string;

	@prop({
		default: 'Faculty',
		enum: ['Faculty', 'Staff', 'Student', 'Faculty and Student', 'Incubatee Entrepreneur', 'Alumini Entrepreneur', 'Innovator/ Entrepreeur External to institute'],
	})
	status20: string;

	@prop({
		default: 'Male',
		enum: ['Male', 'Female', 'Transgender'],
	})
	status21: string;

	@prop({
		default: 'Govt. Agency (Central)',
		enum: ['Govt. Agency (Central)', 'Govt. Agency (State)', 'Educational Institution', 'Corporate/industry Association', 'Non Govt. Agency', 'International Agency'],
	})
	status22: string;


	@prop({ ref: 'User' })
	user: mongoose.Schema.Types.ObjectId;

	@prop({ default: Date.now })
	createdAt: Date;
}


export const StoryModel = getModelForClass(Story);
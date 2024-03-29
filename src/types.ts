import { Request } from "express";
export interface IProductData{productName: string, energy: number, fat: number, protein: number, carbs: number, fiber: number }

export interface AddProductRequest extends Request { productData: IProductData };

export interface ILoginBody { email: string, password: string };
export interface ISignInBody { name:string,email: string, password: string };

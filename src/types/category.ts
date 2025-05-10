export type Category = {
	id: number;
	name: string;
	subCategories: Pick<Category, "id" | "name">[];
};

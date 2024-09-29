export type BookType = {
	id: string;
	status: string;
	title: string;
	ISBN: string;
	author: string;
};

export interface BookPropsType extends BookType {
	index: number;
	change: (index: number, field: keyof BookType, value: string) => void;
	append: (index: number) => void;
	remove: (index: number) => void;
}

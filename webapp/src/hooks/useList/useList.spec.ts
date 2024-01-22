import { act, render, renderHook, screen } from "@testing-library/react";
import { useList } from "./useList";
import { genBlankBook } from "../../pages/booklist/booklist.helper";

test("must be able to return the list", () => {
	// @ts-ignore
	const { list } = renderHook(() => useList());
	expect(list instanceof Array).toBe(true);
});
test("must be able to set the list using setList", () => {
	// @ts-ignore
	const { list, setList } = renderHook(() => useList());

	act(() => {
		jest.mock("");
		setList([]);
	});

	expect(list instanceof Array).toBe(true);
});
test("must be able to append a record", () => {
	// @ts-ignore
	const { append, list } = renderHook(() => useList());
	const oldLength = list.length;

	act(() => {
		append(genBlankBook());
	});

	expect(list.length).toBe(oldLength + 1);
});

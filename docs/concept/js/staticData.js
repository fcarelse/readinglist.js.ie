export const injectStaticData = (data) => {
	data.statusOptions = [
		{ tag: 'unread', label: 'Unread' },
		{ tag: 'reading', label: 'In Progress' },
		{ tag: 'read', label: 'Finished' },
	]
}
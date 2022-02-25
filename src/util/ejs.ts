import moment from 'moment'

export default {
	formatDate: function (date: any, format: string | undefined) {
		return moment(date).utc().format(format)
	},
	truncate: function (str: string, len: number) {
		if (str.length > len && str.length > 0) {
			let new_str = str + ' '
			new_str = str.substring(0, len)
			new_str = str.substring(0, new_str.lastIndexOf(' '))
			new_str = new_str.length > 0 ? new_str : str.substring(0, len)
			return new_str + '...'
		}
		return str
	},
	stripTags: function (input) {
		return input.replace(/<(?:.|\n)*?>/gm, '')
	},
	editIcon: function (storyUser: { _id: { toString: () => any } }, loggedUser: { _id: { toString: () => any } }, storyId: any, floating = true) {
		if (storyUser._id.toString() == loggedUser._id.toString()) {
			if (floating) {
				return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
			} else {
				return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
			}
		} else {
			return ''
		}
	},
	select: function (selected: string, options: { fn: (arg0: any) => string }) {
		return options
			.fn(this)
			.replace(
				new RegExp(' value="' + selected + '"'),
				'$& selected="selected"'
			)
			.replace(
				new RegExp('>' + selected + '</option>'),
				' selected="selected"$&'
			)
	},
}

import { decorate, observable } from 'mobx'

class All {
	@observable repositories = []
}

export const all = new All()

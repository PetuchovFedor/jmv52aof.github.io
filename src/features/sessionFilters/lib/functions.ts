import { DEFAULT_FILTERS } from '@common/consts/chargingSessions'
import { SessionFilters } from '@common/types/chargingSessions'

export const isFiltersDefault = (filters: SessionFilters) =>
	filters.connectors.length === DEFAULT_FILTERS.connectors.length &&
	filters.connectors.every(item => DEFAULT_FILTERS.connectors.includes(item)) &&
	filters.onlyPaidSessions === DEFAULT_FILTERS.onlyPaidSessions &&
	filters.durationInHours === DEFAULT_FILTERS.durationInHours &&
	filters.isModified === DEFAULT_FILTERS.isModified

// src/types/index.tsx
export interface Job{
	_id?: string,
	jobTitle: string,
	jobDescription: string,
	applicants: string[]
	employerName: string,
	employerId?: string,
	employerLogo?: string
}

export interface StoreState {
	jobs: Job[];
}
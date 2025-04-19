export type TFormPageData = TCompanyDetails | TUserCredentials;
export type TReviewData = TCompanyDetails & TUserCredentials;

export type TCompanyDetails = {
	name: string;
    address: string;
	company_email: string;
	phone: string;
};

export type TUserCredentials = {
	first_name: string;
	last_name: string;
	email: string;
	contact: string;
	password:string;
    confirm_password:string;
};

export type TMultiStepFormProps<T extends TFormPageData> = {
	initialValues: T;
	onSubmit: (values: T) => void;
	onBack: (values: T) => void;
	currentStepIndex: number;
};

export type PageData = TCompanyDetails | TUserCredentials | TReviewData;
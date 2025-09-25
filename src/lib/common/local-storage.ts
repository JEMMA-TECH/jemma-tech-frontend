interface StorageUtils {
	set: (key: string, value: string) => void;
	get: (key: string) => string | null;
	remove: (key: string) => void;
	clear: () => void;
}

const createStorageUtils = (): StorageUtils => {
	if (typeof window === 'undefined') {
		// Server-side fallback
		return {
			set: () => {},
			get: () => null,
			remove: () => {},
			clear: () => {}
		};
	}

	return {
		set: (key: string, value: string) => {
			try {
				localStorage.setItem(key, value);
			} catch (error) {
				console.error('Error setting localStorage:', error);
			}
		},
		get: (key: string) => {
			try {
				return localStorage.getItem(key);
			} catch (error) {
				console.error('Error getting localStorage:', error);
				return null;
			}
		},
		remove: (key: string) => {
			try {
				localStorage.removeItem(key);
			} catch (error) {
				console.error('Error removing localStorage:', error);
			}
		},
		clear: () => {
			try {
				localStorage.clear();
			} catch (error) {
				console.error('Error clearing localStorage:', error);
			}
		}
	};
};

export const pref = createStorageUtils();
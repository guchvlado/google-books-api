import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [process, setProcess] = useState<string>('waiting')

    const request = useCallback(async (url: string, method="GET", body=null, headers={'Content-Type': 'application/json'}) => {
        setLoading(true);
        setProcess('loading');

        try {
            const res = await fetch(url, {method, headers, body});
    
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }

            const data = await res.json();
            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            if (e instanceof Error)
                setError(e.message);
            else
                setError('error');
            setProcess('error');
            throw e;
        }
        
    }, []);

    const clearError = useCallback(() => {
        setError(null)
    }, []);

    return {loading, request, error, clearError, process, setProcess};
}
import { Button } from '@/registry/baseon-ui/button/button';

export const HelloWorld = () => {
    return (
        <div>
            <Button variant={'primary'} onClick={() => alert('Hello World')}>
                Hello World
            </Button>
        </div>
    );
};

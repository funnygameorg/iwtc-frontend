import { useSpring } from '@react-spring/web';

export const useGameSelectionAnimation = () => {
    const [leftStyle, leftApi] = useSpring(() => ({
        from: { x: 0 },
        to: { x: 0 },
        loop: {
            reset: true,
        },
    }));
    const [rightStyle, rightApi] = useSpring(() => ({
        from: { x: 0 },
        to: { x: 0 },
        loop: {
            reset: true,
        },
    }));

    const animateSelection = (selectedIndex: 0 | 1) => {
        if (selectedIndex === 0) {
            leftApi.start({ to: { x: 400 } });
            rightApi.start({ to: { x: 2000 } });
            return;
        }

        rightApi.start({ to: { x: -400 } });
        leftApi.start({ to: { x: -2000 } });
    };

    const resetSelectionAnimation = () => {
        rightApi.start({ to: { x: 0 } });
        leftApi.start({ to: { x: 0 } });
    };

    return {
        leftStyle,
        rightStyle,
        animateSelection,
        resetSelectionAnimation,
    };
};

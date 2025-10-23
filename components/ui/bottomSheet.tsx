import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';

interface ModalBottomSheetProps {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    rounded?: boolean;
    heightRatio?: number;
}

export function ModalBottomSheet({ visible, onClose, children, className, rounded = true, heightRatio = 0.7, }: ModalBottomSheetProps) {
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/30">
                <View
                    className={cn(
                        'bg-secondary p-6',
                        rounded && 'rounded-t-3xl',
                        className
                    )}
                    style={{ height: SCREEN_HEIGHT * heightRatio }}
                >
                    <TouchableOpacity
                        className="self-end"
                        onPress={onClose}
                        hitSlop={10}
                    >
                        <Icon as={X} size={30} strokeWidth={2.5} className="text-primary" />
                    </TouchableOpacity>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

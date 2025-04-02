import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
interface UploadButtonProps {
    onFileSelected: (file: File) => void;
}
export function UploadButton({ onFileSelected }: UploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleClick}>
                <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        onFileSelected(files[0]);
                    }
                }}
            />
        </>
    );
}

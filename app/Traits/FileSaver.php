<?php

namespace App\Traits;

trait FileSaver
{
    /**
     * @param object $file
     * @param string $basePath
     * @param string|null $oldPath
     * @param string|null $stringName
     * @return string
     */
    public function upload_file(object $file, string $basePath, string $stringName = null, string $oldPath= null): string
    {
        if ($oldPath) {
            $fullOldPath = public_path($oldPath);
            if (file_exists($fullOldPath)) {
                unlink($fullOldPath);
            }
        }

        $newFileName   = str()->slug($stringName) . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

        $directory   = 'uploads/' . $basePath . '/';

        $file->move($directory, $newFileName);

        return $directory . $newFileName;
    }

}

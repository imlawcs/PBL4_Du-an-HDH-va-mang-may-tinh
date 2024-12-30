namespace StreamingApp.Services{
    public class FileService : IFileService
    {
        private readonly string _uploadDirectory;
        
        public FileService(IWebHostEnvironment environment)
        {
            _uploadDirectory = Path.Combine(environment.WebRootPath, "uploads", "categories");
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if (file == null) throw new ArgumentNullException(nameof(file));
            
            // Generate unique filename
            string fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            string filePath = Path.Combine(_uploadDirectory, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/categories/{fileName}";
        }

        public void DeleteFile(string filePath)
        {
            if (string.IsNullOrEmpty(filePath)) return;

            string fullPath = Path.Combine(_uploadDirectory, Path.GetFileName(filePath));
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }
    }
}
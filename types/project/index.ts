export interface Project {
  id: string
  title: string
  description?: string
  imageCount: number
  createdAt: string
  updatedAt: string
  thumbnailUrl?: string
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: string
  projectId: string
  filename: string
  originalUrl: string
  processedUrl?: string
  thumbnailUrl?: string
  size: number
  mimeType: string
  createdAt: string
  metadata?: ImageMetadata
}

export interface ImageMetadata {
  width: number
  height: number
  format: string
  colorSpace?: string
  hasAlpha?: boolean
}

export interface CreateProjectRequest {
  title: string
  description?: string
}

export interface UpdateProjectRequest {
  title?: string
  description?: string
}

export interface ProjectsResponse {
  projects: Project[]
  total: number
  page: number
  limit: number
}
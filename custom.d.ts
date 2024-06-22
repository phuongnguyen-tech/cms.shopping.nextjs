// custom.d.ts

import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      userId?: number // Thêm thuộc tính userId vào Request của Express
    }
  }
}

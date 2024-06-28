// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   // Lấy token từ header Authorization
//   const token = req.headers.authorization?.split(' ')[1]

//   // Nếu không tồn tại token
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' })
//   }

//   // Xác thực token
//   jwt.verify(token, 'your_secret_key', (err, decoded: any) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid token' })
//     }
//     // Gán userId vào req để sử dụng trong các controller
//     req.userId = decoded.userId
//     next()
//   })
// }

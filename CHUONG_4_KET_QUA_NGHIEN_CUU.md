# CHƯƠNG 4: KẾT QUẢ NGHIÊN CỨU

## 4.1. Tổng quan hệ thống

Website Quản lý Sân bóng đá Thành Trung M10 là một hệ thống quản lý và đặt sân bóng trực tuyến hoàn chỉnh, được xây dựng với kiến trúc Client-Server. Phần Frontend sử dụng HTML5, TailwindCSS và JavaScript để tạo giao diện người dùng hiện đại và responsive. Phần Backend được phát triển bằng Node.js kết hợp Express.js để xử lý logic nghiệp vụ và cung cấp RESTful API. Cơ sở dữ liệu MongoDB được sử dụng để lưu trữ dữ liệu linh hoạt. Hệ thống xác thực người dùng thông qua JWT (JSON Web Token) đảm bảo bảo mật. Toàn bộ hệ thống được chia thành hai phần chính: giao diện người dùng dành cho khách hàng đặt sân, mua sắm và tham gia cộng đồng; giao diện quản trị dành cho quản lý sân bóng, đơn đặt, khách hàng và tài chính.

## 4.2. Giao diện người dùng (Frontend User)

### 4.2.1. Trang chủ (index.html)

Trang chủ là điểm đến đầu tiên của người dùng khi truy cập website, được thiết kế với giao diện hiện đại sử dụng gradient màu xanh lá làm chủ đạo. Phần hero section nổi bật với slideshow tự động chuyển đổi các hình ảnh sân bóng chất lượng cao, kèm theo tiêu đề lớn và nút call-to-action "Đặt sân ngay" thu hút người dùng. Bên dưới là phần thống kê hiển thị các con số ấn tượng về số lượng sân bóng, khách hàng tin tưởng, thời gian hỗ trợ 24/7 và điểm đánh giá trung bình. Tiếp theo là section giới thiệu các tính năng nổi bật của hệ thống như đặt lịch dễ dàng, thanh toán linh hoạt và ưu đãi hấp dẫn với các icon minh họa sinh động. Phần dịch vụ giới thiệu các tiện ích đi kèm như căng tin, phòng thay đồ, bãi đỗ xe và cho thuê dụng cụ. Cuối trang là phần đánh giá từ khách hàng thực tế và banner khuyến mãi đang diễn ra. Thanh navigation cố định ở đầu trang với hiệu ứng blur khi cuộn, giúp người dùng dễ dàng điều hướng đến các trang khác.


### 4.2.2. Trang Sân bóng (san-bong.html)

Trang sân bóng hiển thị danh sách tất cả các sân có sẵn trong hệ thống để người dùng lựa chọn. Phần đầu trang là hero banner với gradient xanh lá và tiêu đề "Danh Sách Sân Bóng" nổi bật. Ngay bên dưới là thanh tìm kiếm được thiết kế với hiệu ứng glass morphism, bao gồm ô input lớn có icon kính lúp để tìm kiếm theo tên hoặc địa chỉ sân, cùng với các nút lọc theo loại sân (Tất cả, Sân 5, Sân 7, Sân 11) có màu sắc thay đổi khi được chọn. Bên cạnh đó còn có dropdown sắp xếp theo tên A-Z hoặc giá từ thấp đến cao và ngược lại. Kết quả tìm kiếm hiển thị số lượng sân tìm được. Danh sách sân được trình bày dạng grid responsive với 4 cột trên màn hình lớn, 3 cột trên tablet và 1-2 cột trên mobile. Mỗi card sân bóng có hình ảnh chiếm phần trên với hiệu ứng zoom khi hover, badge loại sân với màu sắc khác nhau (xanh cho sân 5, tím cho sân 7, cam cho sân 11), số lượng sân con nếu có, và giá tiền hiển thị trực tiếp trên ảnh với overlay gradient. Phần dưới card hiển thị tên sân, địa chỉ với icon định vị, các tiện ích dạng tag nhỏ và nút "Đặt sân ngay" với gradient xanh lá có hiệu ứng hover đẹp mắt. Toàn bộ card có animation fade-in khi load và hiệu ứng nâng lên khi hover tạo cảm giác tương tác mượt mà.

### 4.2.3. Trang Đặt sân (booking.html)

Trang đặt sân cho phép người dùng thực hiện quy trình đặt sân hoàn chỉnh sau khi đã chọn sân từ danh sách. Giao diện được chia thành hai phần chính: bên trái hiển thị thông tin chi tiết sân đã chọn bao gồm hình ảnh, tên sân, địa chỉ, loại sân và giá tiền; bên phải là form đặt sân với các bước rõ ràng. Người dùng đầu tiên chọn ngày đặt sân thông qua calendar picker hiển thị lịch tháng với các ngày có thể chọn được highlight. Tiếp theo là phần chọn khung giờ hiển thị dạng grid các slot thời gian từ 6:00 đến 22:00, mỗi slot có màu sắc khác nhau thể hiện trạng thái trống (xanh), đã đặt (đỏ) hoặc đang chọn (vàng). Nếu sân có nhiều sân con, người dùng có thể chọn sân con cụ thể với giá riêng cho từng sân. Phần tính tiền tự động cập nhật khi người dùng thay đổi lựa chọn, hiển thị giá gốc, giảm giá nếu có mã khuyến mãi và tổng tiền cần thanh toán. Có ô nhập mã khuyến mãi với nút áp dụng để kiểm tra và áp dụng giảm giá. Cuối cùng là nút xác nhận đặt sân nổi bật để hoàn tất quy trình.

### 4.2.4. Trang Thanh toán (payment.html)

Trang thanh toán xử lý việc thanh toán cho đơn đặt sân vừa tạo. Phần trên hiển thị tóm tắt đơn đặt sân bao gồm tên sân, ngày giờ đặt, thời lượng và tổng tiền cần thanh toán được highlight nổi bật. Phần chính là các phương thức thanh toán được trình bày dạng radio button với icon minh họa cho từng loại: tiền mặt tại sân với icon tiền, ví Momo với logo màu hồng, ZaloPay với logo xanh dương, VNPay với logo đỏ và chuyển khoản ngân hàng với icon ngân hàng. Khi chọn phương thức ví điện tử, hệ thống hiển thị mã QR để quét thanh toán cùng với hướng dẫn chi tiết. Khi chọn chuyển khoản, hiển thị thông tin tài khoản ngân hàng và nội dung chuyển khoản cần ghi. Nút xác nhận thanh toán ở cuối form sẽ hoàn tất giao dịch và chuyển đến trang xác nhận thành công với thông tin chi tiết đơn đặt.


### 4.2.5. Trang Cửa hàng (shop.html)

Trang cửa hàng là nơi người dùng có thể mua sắm các sản phẩm thể thao, đồ uống và phụ kiện trực tuyến. Giao diện được thiết kế với hero banner giới thiệu cửa hàng và các ưu đãi đang có. Phần filter bên trái cho phép lọc sản phẩm theo danh mục như đồ uống, thiết bị thể thao, phụ kiện và tìm kiếm theo tên sản phẩm. Danh sách sản phẩm hiển thị dạng grid với mỗi card sản phẩm bao gồm hình ảnh sản phẩm, tên, giá tiền được format theo định dạng tiền Việt Nam, và nút thêm vào giỏ hàng. Khi hover vào card, hiển thị thêm nút xem chi tiết. Giỏ hàng được thiết kế dạng sidebar trượt từ bên phải, hiển thị danh sách sản phẩm đã thêm với số lượng có thể tăng giảm, giá từng sản phẩm và tổng tiền. Nút thanh toán ở cuối giỏ hàng dẫn đến trang checkout để hoàn tất đơn hàng. Badge số lượng sản phẩm trong giỏ hiển thị trên icon giỏ hàng ở thanh navigation.

### 4.2.6. Trang Cộng đồng (community.html)

Trang cộng đồng là không gian để người dùng chia sẻ, tương tác và kết nối với những người yêu bóng đá khác. Giao diện được thiết kế theo phong cách mạng xã hội với feed bài viết ở giữa. Phần đầu có form đăng bài mới cho phép người dùng chọn loại bài viết (tìm đồng đội, chia sẻ kinh nghiệm, thông báo giải đấu), nhập nội dung và đính kèm hình ảnh. Các tab filter cho phép lọc bài theo loại hoặc xem tất cả. Mỗi bài viết hiển thị avatar và tên người đăng, thời gian đăng, loại bài viết với badge màu sắc tương ứng, nội dung bài viết và hình ảnh nếu có. Phần tương tác bao gồm nút thích với số lượt thích, nút bình luận với số comment và nút chia sẻ. Khi click vào bình luận, hiển thị danh sách comment và ô nhập comment mới. Bài viết tìm đồng đội hiển thị thêm thông tin như thời gian, địa điểm và số người cần tìm. Bài viết giải đấu hiển thị thông tin chi tiết về giải đấu, thời gian đăng ký và giải thưởng.

### 4.2.7. Trang Giới thiệu (about.html)

Trang giới thiệu cung cấp thông tin về hệ thống sân bóng Thành Trung M10 với thiết kế storytelling hấp dẫn. Hero section có gradient xanh lá đậm với tiêu đề lớn "Về Thành Trung M10" và slogan về đam mê bóng đá. Section đầu tiên kể câu chuyện thương hiệu với layout hai cột: bên trái là nội dung văn bản mô tả quá trình hình thành và phát triển, kèm theo các con số thống kê về năm kinh nghiệm, lượt đặt sân và tỷ lệ hài lòng; bên phải là hình ảnh minh họa với hiệu ứng float animation. Tiếp theo là section sứ mệnh và tầm nhìn được trình bày trong hai card lớn với gradient màu khác nhau, mỗi card có icon, tiêu đề và nội dung chi tiết. Section giá trị cốt lõi hiển thị bốn giá trị chính (chất lượng, tiện lợi, uy tín, chuyên nghiệp) trong các card nhỏ có hiệu ứng hover nâng lên. Phần thống kê với background gradient xanh hiển thị các con số ấn tượng về sân bóng, khách hàng, thời gian hỗ trợ và đánh giá. Cuối trang là call-to-action với glass morphism kêu gọi người dùng đặt sân.


### 4.2.8. Trang Liên hệ (contact.html)

Trang liên hệ cung cấp các kênh liên lạc và form gửi tin nhắn cho người dùng. Hero section có gradient xanh dương tím với tiêu đề "Liên hệ với chúng tôi" và thông điệp sẵn sàng hỗ trợ. Phần chính được chia thành hai cột: cột lớn bên trái chứa form liên hệ với glass morphism effect, bao gồm các trường nhập họ tên, số điện thoại, email, dropdown chọn chủ đề (đặt sân, hỗ trợ kỹ thuật, góp ý, hợp tác kinh doanh) và textarea nhập nội dung tin nhắn, tất cả đều có validation và hiệu ứng focus đẹp mắt; cột nhỏ bên phải chứa các card thông tin liên hệ bao gồm hotline 24/7 với số điện thoại lớn nổi bật trên nền gradient xanh, thông tin địa chỉ, email và giờ hoạt động với icon minh họa, và các nút liên kết mạng xã hội (Facebook, Instagram, Zalo, YouTube). Bên dưới là section bản đồ Google Maps nhúng hiển thị vị trí sân bóng. Tiếp theo là phần FAQ với các câu hỏi thường gặp về cách đặt sân, chính sách hủy và phương thức thanh toán, mỗi câu hỏi được trình bày trong card riêng với icon và nội dung trả lời. Cuối trang là banner call-to-action với gradient xanh dương kêu gọi đặt sân.

### 4.2.9. Trang Đăng nhập (login.html)

Trang đăng nhập cho phép người dùng đã có tài khoản truy cập vào hệ thống. Giao diện được thiết kế đơn giản với form đăng nhập đặt giữa trang trên nền gradient nhẹ. Form bao gồm logo và tên thương hiệu ở đầu, ô nhập email hoặc số điện thoại với icon, ô nhập mật khẩu có nút toggle hiển thị/ẩn mật khẩu, checkbox ghi nhớ đăng nhập và link quên mật khẩu. Nút đăng nhập có gradient xanh lá với hiệu ứng hover. Bên dưới có đường phân cách và các nút đăng nhập bằng tài khoản Google, Facebook. Cuối form là link dẫn đến trang đăng ký cho người chưa có tài khoản. Khi đăng nhập thành công, hệ thống lưu token và chuyển hướng về trang chủ hoặc trang trước đó.

### 4.2.10. Trang Đăng ký (register.html)

Trang đăng ký cho phép người dùng mới tạo tài khoản để sử dụng hệ thống. Form đăng ký được thiết kế tương tự trang đăng nhập với các trường nhập họ và tên, email, số điện thoại, mật khẩu và xác nhận mật khẩu. Mỗi trường có validation real-time hiển thị thông báo lỗi ngay khi người dùng nhập sai định dạng. Trường mật khẩu có thanh hiển thị độ mạnh với các mức yếu, trung bình, mạnh và màu sắc tương ứng. Checkbox đồng ý với điều khoản sử dụng và chính sách bảo mật là bắt buộc trước khi đăng ký. Nút đăng ký có gradient xanh lá và hiệu ứng loading khi đang xử lý. Sau khi đăng ký thành công, hệ thống tự động đăng nhập và chuyển về trang chủ.

### 4.2.11. Trang Hồ sơ cá nhân (profile.html)

Trang hồ sơ cá nhân cho phép người dùng xem và quản lý thông tin tài khoản của mình. Giao diện được chia thành sidebar bên trái hiển thị avatar, tên người dùng và menu điều hướng các tab; phần nội dung chính bên phải thay đổi theo tab được chọn. Tab thông tin cá nhân hiển thị form chỉnh sửa họ tên, email, số điện thoại, ngày sinh và giới tính với nút lưu thay đổi. Tab đổi mật khẩu có form nhập mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu mới. Tab lịch sử đặt sân hiển thị danh sách các đơn đặt sân đã thực hiện với thông tin ngày giờ, sân, trạng thái và tổng tiền, có thể lọc theo trạng thái và xem chi tiết từng đơn. Tab lịch sử mua hàng tương tự hiển thị các đơn hàng từ cửa hàng. Tab thông báo cho phép bật tắt nhận thông báo qua email và SMS.

### 4.2.12. Trang Thông báo (notifications.html)

Trang thông báo hiển thị tất cả các thông báo của người dùng từ hệ thống. Giao diện có thanh filter ở đầu cho phép lọc theo loại thông báo (tất cả, đặt sân, khuyến mãi, hệ thống) và nút đánh dấu tất cả đã đọc. Danh sách thông báo hiển thị theo thời gian mới nhất, mỗi thông báo có icon theo loại, tiêu đề, nội dung tóm tắt, thời gian và trạng thái đọc/chưa đọc được phân biệt bằng màu nền. Thông báo chưa đọc có nền xanh nhạt và chấm tròn xanh bên cạnh. Khi click vào thông báo, hiển thị nội dung chi tiết và đánh dấu đã đọc. Có nút xóa từng thông báo hoặc xóa tất cả thông báo đã đọc. Phân trang ở cuối danh sách nếu có nhiều thông báo.


## 4.3. Giao diện quản trị (Frontend Admin)

### 4.3.1. Trang Dashboard (admin/index.html)

Trang Dashboard là trang tổng quan dành cho quản trị viên, cung cấp cái nhìn toàn diện về hoạt động kinh doanh. Giao diện được chia thành sidebar cố định bên trái với menu điều hướng đến các chức năng quản lý và phần nội dung chính bên phải. Phần đầu hiển thị bốn card thống kê quan trọng: tổng doanh thu hôm nay, số đơn đặt sân mới, số khách hàng mới và tỷ lệ sân được đặt, mỗi card có icon, số liệu lớn và phần trăm thay đổi so với hôm qua. Bên dưới là biểu đồ đường hiển thị doanh thu theo 7 ngày gần nhất với khả năng chuyển đổi xem theo tuần hoặc tháng. Tiếp theo là hai bảng song song: bảng đơn đặt sân gần đây hiển thị 5 đơn mới nhất với thông tin khách hàng, sân, thời gian và trạng thái; bảng thông báo hệ thống hiển thị các cảnh báo như sân sắp bảo trì, hàng sắp hết hoặc đơn chờ xác nhận. Các nút quick action cho phép truy cập nhanh đến thêm sân mới, xem tất cả đơn đặt hoặc tạo khuyến mãi.

### 4.3.2. Trang Quản lý Sân bóng (admin/fields.html)

Trang quản lý sân bóng cho phép admin thêm, sửa, xóa và quản lý thông tin các sân trong hệ thống. Header có nút "Thêm sân mới" nổi bật. Danh sách sân hiển thị dạng grid với mỗi card sân bao gồm hình ảnh, tên sân, địa chỉ, loại sân, giá tiền, trạng thái (hoạt động/bảo trì/ngừng) với badge màu tương ứng, số lượng sân con và các nút hành động (quản lý ảnh, sửa, xóa). Modal thêm/sửa sân có form nhập đầy đủ thông tin: tên sân, loại sân (dropdown), địa chỉ, giá tiền, tiện ích (textarea), trạng thái và phần quản lý sân con cho phép thêm nhiều sân con với tên, loại và giá riêng cho từng sân. Modal quản lý ảnh cho phép upload nhiều ảnh cùng lúc với preview trước khi upload, hiển thị danh sách ảnh hiện có dạng grid và nút xóa từng ảnh. Khi xóa sân, hiển thị dialog xác nhận với cảnh báo về việc xóa vĩnh viễn.

### 4.3.3. Trang Quản lý Lịch đặt (admin/bookings.html)

Trang quản lý lịch đặt hiển thị và xử lý tất cả các đơn đặt sân trong hệ thống. Phần filter ở đầu trang cho phép lọc theo trạng thái (chờ xác nhận, đã xác nhận, hoàn thành, đã hủy), theo sân, theo khoảng thời gian và tìm kiếm theo tên hoặc số điện thoại khách hàng. Bảng dữ liệu hiển thị các cột: mã đơn, thông tin khách hàng (tên, SĐT), sân đặt, ngày giờ, thời lượng, tổng tiền, trạng thái với badge màu và cột hành động. Các nút hành động bao gồm xem chi tiết, xác nhận đơn (cho đơn chờ), hủy đơn với lý do và in hóa đơn. Modal chi tiết đơn hiển thị đầy đủ thông tin đặt sân, lịch sử thay đổi trạng thái và ghi chú. Phân trang ở cuối bảng với tùy chọn số dòng mỗi trang. Nút xuất báo cáo cho phép export danh sách đơn ra file Excel.

### 4.3.4. Trang Quản lý Khách hàng (admin/customers.html)

Trang quản lý khách hàng hiển thị danh sách tất cả người dùng đã đăng ký trong hệ thống. Thanh tìm kiếm cho phép tìm theo tên, email hoặc số điện thoại. Bảng dữ liệu hiển thị các cột: avatar, họ tên, email, số điện thoại, ngày đăng ký, số lần đặt sân, tổng chi tiêu và trạng thái tài khoản (hoạt động/bị khóa). Cột hành động có nút xem chi tiết và khóa/mở khóa tài khoản. Modal chi tiết khách hàng hiển thị thông tin cá nhân đầy đủ, thống kê hoạt động (số đơn đặt, tổng chi tiêu, đơn hàng) và lịch sử đặt sân gần đây. Có thể lọc danh sách theo khách hàng VIP (chi tiêu trên mức nhất định) hoặc khách hàng mới trong tháng.


### 4.3.5. Trang Quản lý Cộng đồng (admin/community.html)

Trang quản lý cộng đồng cho phép admin kiểm duyệt và quản lý nội dung do người dùng đăng tải. Thanh filter cho phép lọc bài theo trạng thái (chờ duyệt, đã duyệt, bị từ chối), theo loại bài viết và tìm kiếm theo nội dung hoặc người đăng. Danh sách bài viết hiển thị với thông tin người đăng, loại bài, nội dung tóm tắt, thời gian đăng, số lượt thích và bình luận, trạng thái duyệt. Các nút hành động bao gồm xem chi tiết, duyệt bài, từ chối với lý do và xóa bài vi phạm. Modal chi tiết bài viết hiển thị nội dung đầy đủ, hình ảnh đính kèm và danh sách bình luận với khả năng xóa comment vi phạm. Phần tạo thông báo giải đấu cho phép admin đăng bài thông báo về các giải đấu sắp diễn ra với form nhập thông tin chi tiết về giải đấu, thời gian, địa điểm, giải thưởng và điều kiện tham gia.

### 4.3.6. Trang Quản lý Tài chính (admin/revenue.html)

Trang quản lý tài chính cung cấp cái nhìn tổng quan về doanh thu và các giao dịch tài chính. Phần đầu hiển thị các card thống kê: tổng doanh thu tháng này, doanh thu từ đặt sân, doanh thu từ cửa hàng và so sánh với tháng trước. Biểu đồ cột hiển thị doanh thu theo ngày trong tháng với khả năng chuyển đổi xem theo tuần, tháng hoặc năm. Biểu đồ tròn hiển thị tỷ lệ doanh thu theo nguồn (đặt sân, cửa hàng, dịch vụ khác). Bảng chi tiết giao dịch liệt kê tất cả các giao dịch với thông tin mã giao dịch, loại (đặt sân/mua hàng), khách hàng, số tiền, phương thức thanh toán, thời gian và trạng thái. Có thể lọc theo khoảng thời gian, loại giao dịch và phương thức thanh toán. Nút xuất báo cáo cho phép export dữ liệu ra Excel hoặc PDF để báo cáo tài chính.

### 4.3.7. Trang Quản lý Kho (admin/inventory.html)

Trang quản lý kho cho phép admin quản lý hàng hóa trong cửa hàng online. Header có nút thêm sản phẩm mới và các tab lọc theo danh mục (tất cả, đồ uống, thiết bị, phụ kiện). Bảng sản phẩm hiển thị hình ảnh, tên sản phẩm, danh mục, giá bán, số lượng tồn kho với cảnh báo màu đỏ nếu sắp hết, trạng thái (đang bán/ngừng bán) và các nút hành động. Modal thêm/sửa sản phẩm có form nhập tên, danh mục, giá, số lượng, mô tả và upload hình ảnh. Phần nhập kho cho phép cập nhật số lượng khi nhập hàng mới với ghi chú và lịch sử nhập kho. Cảnh báo tự động hiển thị danh sách sản phẩm sắp hết hàng (dưới 10 sản phẩm) để admin kịp thời bổ sung.

### 4.3.8. Trang Quản lý Khuyến mãi (admin/promotions.html)

Trang quản lý khuyến mãi cho phép admin tạo và quản lý các chương trình giảm giá. Danh sách khuyến mãi hiển thị mã giảm giá, tên chương trình, loại giảm (phần trăm/số tiền cố định), giá trị giảm, điều kiện áp dụng (đơn tối thiểu), thời hạn, số lượt đã sử dụng/tổng số lượt và trạng thái (đang hoạt động/hết hạn/vô hiệu). Modal tạo khuyến mãi mới có form nhập mã code, tên chương trình, chọn loại giảm giá, nhập giá trị giảm và giảm tối đa, điều kiện đơn hàng tối thiểu, số lượt sử dụng tối đa, thời gian bắt đầu và kết thúc. Có thể kích hoạt hoặc vô hiệu hóa khuyến mãi bất kỳ lúc nào. Thống kê hiển thị tổng số lượt sử dụng và tổng giá trị đã giảm cho khách hàng.

### 4.3.9. Trang Quản lý Nhân viên (admin/staff.html)

Trang quản lý nhân viên cho phép admin quản lý tài khoản của nhân viên và phân quyền truy cập. Danh sách nhân viên hiển thị avatar, họ tên, email, số điện thoại, vai trò (Admin/Staff), ngày tạo và trạng thái tài khoản. Modal thêm nhân viên mới có form nhập thông tin cá nhân, email đăng nhập, mật khẩu tạm thời và chọn vai trò với mô tả quyền hạn của từng vai trò. Admin có toàn quyền truy cập tất cả chức năng, Staff chỉ có quyền xem và xử lý đơn đặt sân, quản lý kho. Có thể reset mật khẩu cho nhân viên quên mật khẩu, khóa tài khoản nhân viên nghỉ việc và xem lịch sử hoạt động của từng nhân viên bao gồm các thao tác đã thực hiện trên hệ thống.

### 4.3.10. Trang Báo cáo & Thống kê (admin/reports.html)

Trang báo cáo và thống kê cung cấp các báo cáo chi tiết về hoạt động kinh doanh. Thanh chọn khoảng thời gian cho phép xem báo cáo theo ngày, tuần, tháng, quý hoặc năm với date picker tùy chỉnh. Phần báo cáo doanh thu hiển thị biểu đồ đường so sánh doanh thu các kỳ, bảng chi tiết doanh thu theo từng sân và tỷ lệ tăng trưởng. Phần báo cáo đặt sân hiển thị tổng số đơn, tỷ lệ hoàn thành, tỷ lệ hủy, khung giờ đặt nhiều nhất và sân được đặt nhiều nhất. Phần báo cáo khách hàng hiển thị số khách hàng mới, khách hàng quay lại, top khách hàng chi tiêu nhiều nhất. Các biểu đồ có thể tương tác, hover để xem chi tiết từng điểm dữ liệu. Nút xuất báo cáo cho phép download báo cáo dạng PDF với đầy đủ biểu đồ và số liệu hoặc Excel để phân tích thêm.


## 4.4. Backend API

Hệ thống Backend được xây dựng với Node.js và Express.js, cung cấp RESTful API cho Frontend. Authentication API bao gồm các endpoint đăng ký tài khoản mới tại POST /api/auth/register, đăng nhập tại POST /api/auth/login trả về JWT token, lấy thông tin user hiện tại tại GET /api/auth/me và cập nhật thông tin profile tại PUT /api/auth/profile. Fields API quản lý sân bóng với GET /api/fields lấy danh sách sân, GET /api/fields/:id lấy chi tiết sân, POST /api/fields tạo sân mới (yêu cầu quyền Admin), PUT /api/fields/:id cập nhật sân, DELETE /api/fields/:id xóa sân và POST /api/fields/:id/images upload ảnh sân. Bookings API quản lý đặt sân với GET /api/bookings lấy danh sách đơn, GET /api/bookings/available/:fieldId/:date kiểm tra khung giờ trống, POST /api/bookings tạo đơn đặt mới, PUT /api/bookings/:id cập nhật trạng thái và DELETE /api/bookings/:id hủy đơn. Community API quản lý bài viết cộng đồng với GET /api/community lấy danh sách bài, POST /api/community đăng bài mới, POST /api/community/:id/like thích bài và POST /api/community/:id/comment bình luận. Promotions API quản lý khuyến mãi với GET /api/promotions lấy danh sách và POST /api/promotions/validate kiểm tra mã giảm giá. Tất cả các API đều có xử lý lỗi, validation dữ liệu đầu vào và phân quyền truy cập phù hợp.

## 4.5. Kết luận

Hệ thống Website Quản lý Sân bóng đá Thành Trung M10 đã được xây dựng hoàn chỉnh với đầy đủ các chức năng phục vụ cả người dùng và quản trị viên. Đối với người dùng, hệ thống cung cấp khả năng đặt sân online 24/7 với giao diện trực quan dễ sử dụng, hỗ trợ đa dạng phương thức thanh toán bao gồm tiền mặt, ví điện tử Momo, ZaloPay, VNPay và chuyển khoản ngân hàng, cho phép mua sắm đồ thể thao trực tuyến qua cửa hàng tích hợp và tham gia cộng đồng để tìm đồng đội, chia sẻ kinh nghiệm. Đối với quản trị viên, hệ thống cung cấp công cụ quản lý sân bóng, đơn đặt và khách hàng hiệu quả, theo dõi doanh thu với báo cáo chi tiết và biểu đồ trực quan, quản lý kho hàng và chương trình khuyến mãi linh hoạt, kiểm duyệt nội dung cộng đồng và quản lý nhân viên với phân quyền rõ ràng. Về mặt công nghệ, giao diện được thiết kế responsive hoạt động tốt trên mọi thiết bị với TailwindCSS, Backend RESTful API mạnh mẽ với Node.js và Express, cơ sở dữ liệu MongoDB linh hoạt và bảo mật với JWT Authentication. Hệ thống đáp ứng đầy đủ yêu cầu của một website quản lý sân bóng chuyên nghiệp và sẵn sàng triển khai thực tế phục vụ người dùng.

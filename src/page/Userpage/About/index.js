import React, { Fragment } from 'react'
import Carousel from '../../../component/Carousel'
function TruncatedText({ text, maxLength, truncationIndicator }) {
    if (text.length <= maxLength) {
        return <p className='text-base text-gray-600 mt-5'>{text}</p>;
    } else {
        const truncated = text.slice(0, maxLength - truncationIndicator.length) + truncationIndicator;
        return <p className='text-base text-gray-600 mt-5' title={text}>{truncated}</p>;
    }
}
export default function About() {
    const maxTextLength = 150;
    const truncationIndicator = "...";
    return (
        <Fragment>
            <Carousel />
            <section className='justify-center flex py-10 md:py-20'>
                <div className='w-4/5'>
                    <h1 className='text-blue-600 font-bold text-3xl text-center mb-10'>Tin tức</h1>
                    <div className='grid sm:grid-cols-2 gap-5 mb-10'>
                        <div>
                            <img className='w-full rounded-md mb-3' src="https://cdn.tuoitre.vn/thumb_w/1060/471584752817336320/2023/8/16/phim-1692151380956524474609.jpg" alt="anh" />
                            <a target='_blank' href='https://tuoitre.vn/oppenheimer-va-dong-phim-quan-trong-bac-nhat-the-ky-20230816090837524.htm' className='md:text-lg hover:text-blue-600 duration-300 font-bold'>Oppenheimer và dòng phim quan trọng bậc nhất thế kỷ</a>
                            <TruncatedText text="Oppenheimer. Bộ phim hay nhất, quan trọng nhất của thế kỷ này. Nếu bạn chỉ xem một phim rạp năm nay thì đó nên là Oppenheimer" maxLength={maxTextLength} truncationIndicator={truncationIndicator} />
                        </div>
                        <div>
                            <img className='w-full rounded-md mb-3' src="https://gamek.mediacdn.vn/133514250583805952/2023/8/18/13-1200-1692337768664-16923377687991909946432.jpg" alt="anh" />
                            <a target='_blank' href='https://gamek.vn/danh-gia-blue-beetle-sieu-anh-hung-dau-tien-cua-dong-phim-dcu-moi-178230818125129427.chn' className='md:text-lg hover:text-blue-600 duration-300 font-bold'>Blue Beetle - siêu anh hùng đầu tiên của dòng phim DCU mới</a>
                            <TruncatedText text="Siêu anh hùng Blue Beetle sẽ đại diện cho nhân vật chính thức đầu tiên trong dòng phim DCU mới của họ, tách biệt với dòng phim DCEU vừa chứng kiến sự thất bại của The Flash." maxLength={maxTextLength} truncationIndicator={truncationIndicator} />
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <div>
                            <img className='w-full rounded-md mb-3 h-56' src="https://cdn.tuoitre.vn/zoom/260_163/471584752817336320/2023/6/10/33hx4qq-preview-1686394641713791043175-0-0-1125-1800-crop-16863951476311348993775.jpg" alt="anh" />
                            <a target='_blank' href='https://tuoitre.vn/thai-lan-khai-truong-rap-phim-dau-tien-danh-cho-thu-cung-20230610180945085.htm#:~:text=Theo%20H%C3%A3ng%20tin%20AFP%2C%20chu%E1%BB%97i,v%E1%BB%9Bi%20th%C3%BA%20c%C6%B0ng%20c%E1%BB%A7a%20m%C3%ACnh.' className='md:text-lg hover:text-blue-600 duration-300 font-bold'>Thái Lan khai trương rạp phim đầu tiên dành cho thú cưng</a>
                            <TruncatedText text="Chuỗi rạp chiếu phim lớn nhất Thái Lan Major Cineplex khai trương rạp phim đầu tiên cho phép thú cưng được vào phim cùng với chủ." maxLength={maxTextLength} truncationIndicator={truncationIndicator} />
                        </div>
                        <div>
                            <img className='w-full rounded-md mb-3 h-56' src="https://cdn.tuoitre.vn/zoom/260_163/2022/8/1/than-thor-nude-1659352582228328831719-crop-16593525916861338296683.jpeg" alt="anh" />
                            <a target='_blank' href='https://cuoi.tuoitre.vn/bom-tan-cua-than-sam-chris-hemsworth-khong-the-nhap-canh-malaysia-vi-canh-nude-20220801182815466.htm' className='md:text-lg hover:text-blue-600 duration-300 font-bold'>Bom tấn của 'thần Sấm' Chris Hemsworth không thể ‘nhập cảnh’ Malaysia vì... cảnh nude</a>
                            <TruncatedText text="Mặc dù trở thành cơn sốt toàn cầu và khiến các mọt phim hối hả ra rạp nhưng bom tấn mới về thần Sấm có tên 'Thor: Tình yêu và Sấm sét' đã không thể nhập cảnh Malaysia khiến các fan đất nước này tiếc hùi hụi." maxLength={maxTextLength} truncationIndicator={truncationIndicator} />
                        </div>
                        <div>
                            <img className='w-full rounded-md mb-3 h-56' src="https://vanhoavaphattrien.vn/uploads/images/2023/08/01/b2-2023-08-01t203745402-1690897400.jpg" alt="anh" />
                            <a target='_blank' href='https://vanhoavaphattrien.vn/uoc-nguyen-10-nam-bo-phim-tai-hien-mot-chuyen-tinh-dam-nuoc-mat-a20127.html' className='md:text-lg hover:text-blue-600 duration-300 font-bold'>“Ước nguyện 10 năm” – Bộ phim tái hiện một chuyện tình đẫm nước mắt</a>
                            <TruncatedText text="Qua ống kính của đạo diễn Nhật Bản Michihito Fuji, tình yêu giữa những con người chênh vênh giữa cuộc đời và mong ước được sống một cách mãnh liệt đã được thể hiện một cách hoàn hảo và chân thực." maxLength={maxTextLength} truncationIndicator={truncationIndicator} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Attachments = () => {

    const fileList = [
       /*  {
            uid: '-1',
            name: 'ManualConsultoria.pdf',
            status: 'done',
            url: 'https://consultorsalud.com/wp-content/uploads/2020/12/Manual-Tarifario-SOAT-de-Salud-2021-Consultorsalud.pdf',
            thumbUrl: 'https://consultorsalud.com/wp-content/uploads/2020/12/Manual-Tarifario-SOAT-de-Salud-2021-Consultorsalud.pdf',
        },
        {
            uid: '-2',
            name: 'ManualConsultoria.pdf',
            status: 'done',
            url: 'https://consultorsalud.com/wp-content/uploads/2020/12/Manual-Tarifario-SOAT-de-Salud-2021-Consultorsalud.pdf',
            thumbUrl: 'https://consultorsalud.com/wp-content/uploads/2020/12/Manual-Tarifario-SOAT-de-Salud-2021-Consultorsalud.pdf',
        } */
    ];

    return (
        <div className='attachmentsContainer' >
            <Upload
                listType="picture"
                defaultFileList={[...fileList]}
            >
                <Button className='buttonAttachments' disabled={true} icon={<UploadOutlined />}>Subir</Button>
            </Upload>
        </div>
    )
}

export default Attachments;
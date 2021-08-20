import Attachments from 'components/tasks-components/attachments';
import Axios from '../configs/RequestInterceptors'

const AttachmentsService = {};

AttachmentsService.uploadAttachment = attachment => Axios({
    url: `/attachments`,
    method: 'POST',
    data: attachment,
    headers: {'Content-Type': 'multipart/form-data'}
}).then(res => res).catch(err => err.response);

AttachmentsService.getAttachment = attachment => Axios({
    url: `/attachments`,
    method: 'GET',
    data: attachment
}).then(res => res).catch(err => err.response);

AttachmentsService.deleteAttachment = attachment => Axios({
    url: `/attachments`,
    method: 'DELETE',
    data: attachment
}).then(res => res).catch(err => err.response);

export default AttachmentsService;
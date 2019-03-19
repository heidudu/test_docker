import re
from ..models import User


def search_users(content):
    content = re.sub(r'\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*', '', content)
    users = re.findall(r'@[a-zA-Z0-9\-_]+\b', content)
    users = [i.replace('@', '') for i in users]
    li = []
    for i in users:
        user = User.query.filter(User.loginname == i).first()
        if user:
            li.append(user.loginname)
        else:
            continue
    return li



def link_users(content):
    users = search_users(content)
    for i in users:
        url_username = '[@' + i + '](/user/' + i + ')'
        content = content.replace('@'+i, url_username)
    return content


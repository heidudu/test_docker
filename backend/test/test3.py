import re
content = '''
<div class="markdown-text"><p><a href="/user/airyland">@airyland</a> <a href="/user/yaochun">@yaochun</a> <a href="/user/jinphen">@jinphen</a> <a href="/user/jinphen">@jinphen</a> <a href="/user/ruanyl">@ruanyl</a> <a href="/user/yessirpopesama">@yessirpopesama</a>  谢谢你们，问题已经解决了，确实是gzip压缩和解压的问题 。
不过你们好热闹，大家都是追求真理的人呐</p>
<p>我的chrome 确实安装了 json 自动转换工具， 所以在浏览器中 就能看到正确的 json格式</p>
</div>
'''
# 剔除重复发送
content = content.replace('@thonatos' + ' ', '')

# 排除项
content = re.sub(r'\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*', '', content)
print(content)
users = re.findall(r'@[a-z0-9\-_]+\b', content)
[i.replace('@', '')for i in users]
print([i.replace('@', '')for i in users])

'''
for i in users:
    print(i)
    username = i.replace('@', '')
    at_user = User.query.filter(User.loginname == username).first()
    if user:
        message = Message(type='at', receive_user=at_user, send_user=reply.author, topic=topic)
        db.session.add(message)
    else:
        continue
db.session.commit()
'''
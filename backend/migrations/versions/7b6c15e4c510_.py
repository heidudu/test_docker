"""empty message

Revision ID: 7b6c15e4c510
Revises: 
Create Date: 2019-01-09 20:52:24.170293

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b6c15e4c510'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.String(length=64), nullable=False),
    sa.Column('loginname', sa.String(length=64), nullable=True),
    sa.Column('avatar_url', sa.String(length=150), nullable=True),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.Column('create_at', sa.DateTime(), nullable=True),
    sa.Column('accesstoken', sa.String(length=64), nullable=True),
    sa.Column('test', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('accesstoken'),
    sa.UniqueConstraint('avatar_url'),
    sa.UniqueConstraint('loginname')
    )
    op.create_table('topic',
    sa.Column('id', sa.String(length=64), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=True),
    sa.Column('content', sa.Text(), nullable=True),
    sa.Column('author_id', sa.String(length=64), nullable=True),
    sa.Column('top', sa.Boolean(), nullable=True),
    sa.Column('good', sa.Boolean(), nullable=True),
    sa.Column('reply_count', sa.Integer(), nullable=True),
    sa.Column('visit_count', sa.Integer(), nullable=True),
    sa.Column('create_at', sa.DateTime(), nullable=True),
    sa.Column('update_at', sa.DateTime(), nullable=True),
    sa.Column('last_reply_at', sa.DateTime(), nullable=True),
    sa.Column('tabe', sa.String(length=64), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reply',
    sa.Column('id', sa.String(length=64), nullable=False),
    sa.Column('content', sa.Text(), nullable=True),
    sa.Column('topic_id', sa.String(length=64), nullable=True),
    sa.Column('author_id', sa.String(length=64), nullable=True),
    sa.Column('reply_id', sa.String(length=64), nullable=True),
    sa.Column('create_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['reply_id'], ['reply.id'], ),
    sa.ForeignKeyConstraint(['topic_id'], ['topic.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ups',
    sa.Column('user_id', sa.String(length=64), nullable=False),
    sa.Column('reply_id', sa.String(length=64), nullable=False),
    sa.ForeignKeyConstraint(['reply_id'], ['reply.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'reply_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ups')
    op.drop_table('reply')
    op.drop_table('topic')
    op.drop_table('user')
    # ### end Alembic commands ###

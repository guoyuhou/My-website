import json
import os
from datetime import datetime
import argparse

def load_metadata(metadata_path):
    try:
        with open(metadata_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"posts": []}

def save_metadata(metadata, metadata_path):
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

def create_post(title, category, tags, layout="null"):
    # 设置基础路径
    base_path = "posts/content"
    metadata_path = os.path.join(base_path, "metadata.json")
    
    # 获取当前日期
    now = datetime.now()
    year = now.strftime("%Y")
    month = now.strftime("%m")
    date = now.strftime("%Y-%m-%d")
    
    # 创建文件夹路径
    post_dir = os.path.join(base_path, year, month)
    os.makedirs(post_dir, exist_ok=True)
    
    # 创建文件名
    filename = f"{title}.md"
    file_path = os.path.join(post_dir, filename)
    
    # 准备文章内容
    content = f"""---
title: {title}
date: {date}
category: {category}
tags: {tags}
layout: {layout}
---
# {title}

"""
    
    # 写入文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # 更新 metadata.json
    metadata = load_metadata(metadata_path)
    relative_path = os.path.join(year, month, filename)
    
    new_post = {
        "title": title,
        "date": date,
        "category": category,
        "tags": tags,
        "path": relative_path
    }
    
    metadata["posts"].append(new_post)
    metadata["posts"].sort(key=lambda x: x["date"], reverse=True)
    
    save_metadata(metadata, metadata_path)
    
    print(f"成功创建文章：{file_path}")
    print(f"已更新 metadata.json")

def main():
    parser = argparse.ArgumentParser(description='创建新的博客文章')
    parser.add_argument('title', help='文章标题')
    parser.add_argument('--category', default='随笔', help='文章分类')
    parser.add_argument('--tags', nargs='+', default=['随笔'], help='文章标签（可多个）')
    parser.add_argument('--layout', default='null', help='布局模板')
    
    args = parser.parse_args()
    
    create_post(
        title=args.title,
        category=args.category,
        tags=args.tags,
        layout=args.layout
    )

if __name__ == "__main__":
    main() 
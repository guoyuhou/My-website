import tkinter as tk
from tkinter import ttk, messagebox
from tkcalendar import DateEntry  # 需要先安装: pip install tkcalendar
import json
import os
from datetime import datetime

class BlogPostCreator(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("博客文章创建器")
        self.geometry("500x450")
        
        # 创建主框架
        main_frame = ttk.Frame(self, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # 标题
        ttk.Label(main_frame, text="文章标题:").grid(row=0, column=0, sticky=tk.W, pady=5)
        self.title_entry = ttk.Entry(main_frame, width=50)
        self.title_entry.grid(row=0, column=1, columnspan=2, sticky=(tk.W, tk.E), pady=5)

        # 日期选择
        ttk.Label(main_frame, text="发布日期:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.date_picker = DateEntry(main_frame, width=20, 
                                   background='darkblue', foreground='white', 
                                   borderwidth=2, locale='zh_CN')
        self.date_picker.grid(row=1, column=1, sticky=tk.W, pady=5)

        # 分类
        ttk.Label(main_frame, text="文章分类:").grid(row=2, column=0, sticky=tk.W, pady=5)
        self.category_entry = ttk.Entry(main_frame, width=50)
        self.category_entry.insert(0, "随笔")
        self.category_entry.grid(row=2, column=1, columnspan=2, sticky=(tk.W, tk.E), pady=5)

        # 标签
        ttk.Label(main_frame, text="文章标签:").grid(row=3, column=0, sticky=tk.W, pady=5)
        self.tags_entry = ttk.Entry(main_frame, width=50)
        self.tags_entry.insert(0, "随笔")
        self.tags_entry.grid(row=3, column=1, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        ttk.Label(main_frame, text="(多个标签用空格分隔)").grid(row=4, column=1, sticky=tk.W)

        # 布局
        ttk.Label(main_frame, text="布局模板:").grid(row=5, column=0, sticky=tk.W, pady=5)
        self.layout_entry = ttk.Entry(main_frame, width=50)
        self.layout_entry.insert(0, "null")
        self.layout_entry.grid(row=5, column=1, columnspan=2, sticky=(tk.W, tk.E), pady=5)

        # 创建按钮
        ttk.Button(main_frame, text="创建文章", command=self.create_post).grid(row=6, column=1, pady=20)

        # 状态显示
        self.status_text = tk.Text(main_frame, height=8, width=50)
        self.status_text.grid(row=7, column=0, columnspan=3, pady=10)
        self.status_text.config(state=tk.DISABLED)

    def update_status(self, message):
        self.status_text.config(state=tk.NORMAL)
        self.status_text.insert(tk.END, message + "\n")
        self.status_text.see(tk.END)
        self.status_text.config(state=tk.DISABLED)

    def create_post(self):
        title = self.title_entry.get().strip()
        if not title:
            messagebox.showerror("错误", "标题不能为空！")
            return

        category = self.category_entry.get().strip()
        tags = self.tags_entry.get().strip().split()
        layout = self.layout_entry.get().strip()

        try:
            # 设置基础路径 - 确保使用正确的路径分隔符
            base_path = os.path.abspath("posts/content")
            metadata_path = os.path.join(base_path, "metadata.json")
            
            # 获取选择的日期
            selected_date = self.date_picker.get_date()
            year = selected_date.strftime("%Y")
            month = selected_date.strftime("%m")
            date = selected_date.strftime("%Y-%m-%d")
            
            # 创建文件夹路径
            post_dir = os.path.join(base_path, year, month)
            os.makedirs(post_dir, exist_ok=True)
            
            # 创建文件名
            filename = f"{title}.md"
            file_path = os.path.join(post_dir, filename)
            
            if os.path.exists(file_path):
                if not messagebox.askyesno("警告", "文件已存在，是否覆盖？"):
                    return
            
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
            
            self.update_status(f"✓ 成功创建文章：{file_path}")
            
            # 更新 metadata.json
            try:
                metadata = {"articles": [], "categories": [], "tags": []}  # 匹配现有结构
                
                if os.path.exists(metadata_path):
                    try:
                        with open(metadata_path, 'r', encoding='utf-8') as f:
                            existing_metadata = json.load(f)
                            if isinstance(existing_metadata, dict):
                                metadata = existing_metadata
                            else:
                                self.update_status("警告: metadata.json 格式不正确，将重新创建")
                    except json.JSONDecodeError:
                        self.update_status("警告: metadata.json 解析失败，将重新创建")
                else:
                    self.update_status("提示: 将创建新的 metadata.json 文件")
                
                # 构建相对路径 - 使用正斜杠
                relative_path = f"{year}/{month}/{filename}"
                
                # 生成文章ID
                article_id = f"{year}-{month}-{title}"
                
                # 移除同路径的旧文章（如果存在）
                if "articles" in metadata:
                    metadata["articles"] = [article for article in metadata["articles"] 
                                          if article.get("path") != relative_path]
                else:
                    metadata["articles"] = []
                
                # 添加新文章
                new_article = {
                    "id": article_id,
                    "title": title,
                    "date": date,
                    "category": category,
                    "tags": tags,
                    "summary": f"{title}读书笔记。",  # 可以后续添加自定义摘要功能
                    "path": relative_path,
                    "cover": "/assets/images/default-cover.jpg"  # 可以后续添加封面图片选择功能
                }
                
                metadata["articles"].append(new_article)
                # 按日期排序
                metadata["articles"].sort(key=lambda x: x["date"], reverse=True)
                
                # 更新分类和标签列表
                if category not in metadata["categories"]:
                    metadata["categories"].append(category)
                
                for tag in tags:
                    if tag not in metadata["tags"]:
                        metadata["tags"].append(tag)
                
                # 保存更新后的 metadata.json
                with open(metadata_path, 'w', encoding='utf-8') as f:
                    json.dump(metadata, f, ensure_ascii=False, indent=2)
                
                self.update_status("✓ 已更新 metadata.json")
                
                # 清空输入框
                self.title_entry.delete(0, tk.END)
                self.category_entry.delete(0, tk.END)
                self.category_entry.insert(0, "随笔")
                self.tags_entry.delete(0, tk.END)
                self.tags_entry.insert(0, "随笔")
                self.layout_entry.delete(0, tk.END)
                self.layout_entry.insert(0, "null")
                
            except Exception as e:
                error_msg = f"metadata.json 更新失败：{str(e)}"
                self.update_status(f"✗ {error_msg}")
                import traceback
                self.update_status(traceback.format_exc())
                raise Exception(error_msg)
                
        except Exception as e:
            messagebox.showerror("错误", f"创建文章失败：{str(e)}")
            self.update_status(f"✗ 错误：{str(e)}")

if __name__ == "__main__":
    app = BlogPostCreator()
    app.mainloop() 